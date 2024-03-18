import { getAllOrganisations } from "@/actions/organisation";
import InviteCode from "../shared/invite-code";

export default async function JoinOrganisation() {
  const organisations = await getAllOrganisations();

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl font-semibold text-center">
        Please select the Organisation and enter the Invite Code provided by the
        Organisation Admin
      </h1>
      <InviteCode organisations={organisations} />
    </div>
  );
}
