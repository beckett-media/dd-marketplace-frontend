import React from 'react';
import FacReport from '../../components/FacReport/Fac_report';
import ContainerPage from '../../components/layouts/ContainerPage';
import { useRouter } from 'next/router';

const facReport = () => {
    const router = useRouter();
    const { fid } = router.query;
    return (
        <ContainerPage title="Snap Score" boxed={true} noHeader={true}>
            <FacReport id={fid} />
        </ContainerPage>
    );
};
export default facReport;
