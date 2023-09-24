import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { ErrorMessage } from "~/components/error-message";
import { Spinner } from "~/components/spinner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { createRecycleTicket } from "~/controllers/ticket.server";
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

  return { userId };
};

export default function FacilityTicketBookingPage() {
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { id } = useParams();

  const busy = state === "submitting";

  return (
    <div className="h-full w-full p-4">
      <Form
        className="grid gap-4 py-4"
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
            Description of the damage
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
          <Label htmlFor="image">Image</Label>
          <Input id="image" type="file" name="image" accept="image/*" />
          <ErrorMessage>
            {/* @ts-ignore */}
            {actionData?.error?.image?._errors[0]}
          </ErrorMessage>
        </div>
        <input type="hidden" name="facilityId" value={id} />
        <Button type="submit" name="__action" value="create" disabled={busy}>
          {busy ? <Spinner /> : null}
          <span>Submit</span>
        </Button>
      </Form>
    </div>
  );
}
