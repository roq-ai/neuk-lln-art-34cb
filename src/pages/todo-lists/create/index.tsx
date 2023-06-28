import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTodoList } from 'apiSdk/todo-lists';
import { Error } from 'components/error';
import { todoListValidationSchema } from 'validationSchema/todo-lists';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ArtLocationInterface } from 'interfaces/art-location';
import { getUsers } from 'apiSdk/users';
import { getArtLocations } from 'apiSdk/art-locations';
import { TodoListInterface } from 'interfaces/todo-list';

function TodoListCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TodoListInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTodoList(values);
      resetForm();
      router.push('/todo-lists');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TodoListInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      art_location_id: (router.query.art_location_id as string) ?? null,
    },
    validationSchema: todoListValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Todo List
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<ArtLocationInterface>
            formik={formik}
            name={'art_location_id'}
            label={'Select Art Location'}
            placeholder={'Select Art Location'}
            fetcher={getArtLocations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'todo_list',
  operation: AccessOperationEnum.CREATE,
})(TodoListCreatePage);
