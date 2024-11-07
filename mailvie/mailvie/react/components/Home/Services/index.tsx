import { HandleCampaign } from "./Campaign";
import { LeadIdentification } from "./Lead";
import { ManageWorkflow } from "./Workflow";

export function Service() {
  return (
    <>
      <LeadIdentification />
      <HandleCampaign />
      <ManageWorkflow />
    </>
  );
}
