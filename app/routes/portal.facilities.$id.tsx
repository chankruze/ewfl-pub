import { getAuth } from "@clerk/remix/ssr.server";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl";
import { ErrorMessage } from "~/components/error-message";
import { Pin } from "~/components/pin";
import { Spinner } from "~/components/spinner";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";
import { createRecycleTicket } from "~/controllers/ticket.server";
import { prisma } from "~/lib/db.server";
import { uploadHandler } from "~/lib/upload.server";

export const action = async (args: ActionFunctionArgs) => {
  try {
    const { userId } = await getAuth(args);

    if (!userId) {
      return redirect("/sign-in");
    }

    const formData = await unstable_parseMultipartFormData(
      args.request,
      uploadHandler
    );

    const __action = formData.get("__action");

    switch (__action) {
      case "create": {
        const facilityId = formData.get("facilityId") as string;
        const _ticket = await createRecycleTicket(formData, userId, facilityId);

        if (_ticket.id) return redirect(`/tickets/${_ticket.id}`);

        return json({
          ok: false,
          error: _ticket.error,
        });
      }

      default: {
        throw new Error("Unknown action");
      }
    }
  } catch (e) {
    console.error(e);
    if (e.http_code) {
      return json({
        ok: false,
        error: {
          image: "No image selected",
        },
      });
    }

    throw new Response("Something went wrong", {
      status: 500,
    });
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in");
  }

  const facilityId = args.params.id;

  const facility = await prisma.facility.findUnique({
    where: { id: facilityId },
    include: {
      facilityUsers: {
        where: {
          role: "MANAGER",
        },
      },
    },
  });

  return json({ userId, facility, MAPBOX_API_KEY: process.env.MAPBOX_API_KEY });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.facility?.name} / ${SITE_TITLE}` },
    {
      property: "og:title",
      content: `${data?.facility?.name} / ${SITE_TITLE}`,
    },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export default function FacilityTicketBookingPage() {
  const { facility, MAPBOX_API_KEY } = useLoaderData();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { id } = useParams();
  const navigate = useNavigate();

  const busy = state === "submitting";

  const goToFacilities = () => navigate("/portal/facilities");

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center justify-between border-b p-2 gap-2">
        <div className="flex items-center gap-2">
          <Button variant="link" onClick={goToFacilities}>
            <ChevronLeft />
            <span>Facilities</span>
          </Button>
        </div>
      </header>
      <ScrollArea>
        <div className="h-full w-full p-4 grid lg:grid-cols-2 gap-4">
          <div className="space-y-2 p-2 sm:p-4 row-start-3 lg:row-start-1">
            <p className="text-2xl font-bold">Create a ticket</p>
            <Form
              className="space-y-3"
              method="post"
              encType="multipart/form-data"
            >
              <div className="space-y-1">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="i.e. Recycle ASUS TUF gaming laptop"
                  required
                />
                <ErrorMessage>
                  {/* @ts-ignore */}
                  {actionData?.error?.title?._errors[0]}
                </ErrorMessage>
              </div>
              {/* TODO: add dropdown to select product category */}
              {/* TODO: add dropdown to select product model */}
              <div className="space-y-1">
                <Label htmlFor="description" className="text-right">
                  Description of the e-waste
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="i.e. The motherboard is busted, rest components are intact."
                />
                <ErrorMessage>
                  {/* @ts-ignore */}
                  {actionData?.error?.description?._errors[0]}
                </ErrorMessage>
              </div>
              {/* TODO: add image upload component */}
              <div className="space-y-1">
                <Label htmlFor="image">Image of the e-waste</Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                />
                <ErrorMessage>
                  {/* @ts-ignore */}
                  {actionData?.error?.image}
                </ErrorMessage>
              </div>
              <input type="hidden" name="facilityId" value={id} />
              <Button
                className="w-full"
                type="submit"
                name="__action"
                value="create"
                disabled={busy}
              >
                {busy ? <Spinner /> : null}
                <span>Submit</span>
              </Button>
            </Form>
          </div>
          <hr className="sm:hidden row-start-2" />
          <div className="space-y-2 p-2 sm:p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold">{facility.name}</p>
                <p className="italic">{facility.address}</p>
              </div>
              <Badge variant="secondary">{facility.facId}</Badge>
            </div>
            <div className="bg-stone-50 h-64">
              <Map
                reuseMaps
                initialViewState={{
                  longitude: facility.location.coordinates[0],
                  latitude: facility.location.coordinates[1],
                  zoom: 14,
                  bearing: 0,
                  pitch: 0,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_API_KEY}
              >
                <Marker
                  longitude={facility.location.coordinates[0]}
                  latitude={facility.location.coordinates[1]}
                  anchor="bottom"
                >
                  <Pin facility={facility} />
                </Marker>
              </Map>
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 sm:flex-auto">
                <fieldset class="border border-primary px-3 pb-2">
                  <legend>Manager</legend>
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {facility.facilityUsers[0].name}
                  </p>
                  <p>
                    <span className="font-medium">E-mail:</span>{" "}
                    {facility.facilityUsers[0].email}
                  </p>
                </fieldset>
              </div>
              <div className="flex-1 sm:flex-auto text-end">
                <p>
                  Estd.: {format(new Date(facility.createdAt), "dd MMM yyyy")}
                </p>
                <p>E-mail: {facility.email}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
