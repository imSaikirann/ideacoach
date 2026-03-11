import BackButton from "@/components/common/back-button";
import Container from "@/components/common/Container";
import ProInterestForm from "@/features/ideaCoach/components/ProInterestForm";

export default function UpgradePage() {
  return (
    <Container>
      <div className="py-10 max-w-2xl mx-auto m-10 p-5">

        {/* Back button */}
        <div className="mb-6">
          <BackButton label="Back" />
        </div>

        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Upgrade to Pro
          </h1>

          <p className="text-sm text-muted-foreground">
            Unlock advanced idea analysis, deeper insights, and higher monthly
            usage limits. Fill out the form below and we’ll reach out with early
            access.
          </p>
        </div>

        {/* Form Card */}
        <div className="border border-border rounded-2xl bg-card p-6">
          <ProInterestForm />
        </div>

      </div>
    </Container>
  );
}