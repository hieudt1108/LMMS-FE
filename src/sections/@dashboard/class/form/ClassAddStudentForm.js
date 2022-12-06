import React, { useEffect, useMemo, useState } from 'react';
import { Card, Stack } from '@mui/material';
import FormProvider from '../../../../components/hook-form';
// API
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useRouter } from 'next/router';
import ClassNewEditMemberDetails from './ClassNewEditMemberDetails';
import { updateClassMember } from 'src/dataProvider/agent';

export default function ClassAddStudentForm({ isEdit = false, classID }) {
    const { push } = useRouter();

    const [loadingSend, setLoadingSend] = useState(false);

    const defaultValues = useMemo(
        () => ({
            items: [{ nguoiDung: '', vaiTro: '', monDay: [] }],
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({})),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    const handleCreateAndSend = async (data) => {
        let postData = [];
        data.items.forEach((element) => {
            let userId = element['nguoiDung'].id;
            let roleId = +element['vaiTro'];
            let subjectIds = element['monDay'].map((item) => item.id);
            postData.push({
                userId: userId,
                userRoleClass: {
                    roleId: roleId,
                    subjectId: subjectIds,
                },
            });
        });
        console.log('postData', postData);
        const response = await updateClassMember(classID, postData);
        console.log('Create', response);
    };

    return (
        <FormProvider methods={methods}>
            <ClassNewEditMemberDetails data={classID} />

            <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                <LoadingButton
                    size="large"
                    variant="contained"
                    loading={loadingSend && isSubmitting}
                    onClick={handleSubmit(handleCreateAndSend)}
                >
                    {isEdit ? 'Cập nhật' : 'Tạo mới'}
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
