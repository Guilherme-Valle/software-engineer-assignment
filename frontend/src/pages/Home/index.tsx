import PageHeader from "../../components/PageHeader";
import CandidatesList from "../../components/CandidatesList";
import ContentCard from "../../components/ContentCard";
import PageBody from "../../components/PageBody";

export default function Home() {
  return (
    <>
      <PageHeader text="Candidate list" withCreateCandidate />
      <PageBody>
        <ContentCard>
          <CandidatesList />
        </ContentCard>
      </PageBody>
    </>

  );
}
