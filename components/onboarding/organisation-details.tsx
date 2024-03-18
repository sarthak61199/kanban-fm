import OrganisationDetailsForm from "./organisation-details-form";

export default function OrganisationDetails() {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-semibold">
        Tell us about your Organisation
      </h1>
      <OrganisationDetailsForm />
    </div>
  );
}
