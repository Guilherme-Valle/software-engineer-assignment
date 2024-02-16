import PageBody from "../../components/PageBody";
import PageHeader from "../../components/PageHeader";
import ContentCard from "../../components/ContentCard";
import DispositionForm from "../../components/DispositionForm";

export default function Disposition() {
  return (
    <>
      <PageHeader text="Candidate disposition" />
      <PageBody>
        <ContentCard>
          <h3>Set disposition</h3>
          <DispositionForm />
        </ContentCard>
      </PageBody>
    </>
  )
}
