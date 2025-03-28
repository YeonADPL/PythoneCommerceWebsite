import { Form, useActionData, useNavigation } from 'react-router-dom';

interface ActionData {
  error?: string;
  success?: boolean;
}

const Login = () => {
  const actionData = useActionData() as ActionData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
              <input
                placeholder="Email"
                name="email"
                type="email"
                required
              />
              <input
                placeholder="Password"
                name="password"
                required
              />
              <button>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              {actionData?.error && (
                <div>
                  {actionData.error}
                </div>
              )}
          </Form>
  );
};

export default Login;