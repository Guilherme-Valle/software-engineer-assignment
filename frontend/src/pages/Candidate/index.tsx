import { useParams } from "react-router-dom";
import CandidateForm from "../../components/CandidateForm";
import ContentCard from "../../components/ContentCard";
import PageBody from "../../components/PageBody";
import PageHeader from "../../components/PageHeader";

export default function Candidate() {
  const { id } = useParams();

  return (
    <>
      <PageHeader text={`${id ? 'Edit' : 'Create'} candidate`} />
      <PageBody>
        <ContentCard>
          <h3>Candidate information</h3>
          <CandidateForm />
        </ContentCard>
      </PageBody>
    </>
  )
}
