import { Form, useActionData, useNavigation } from 'react-router-dom';

interface ActionData {
  error?: string;
  success?: boolean;
}

const SignUp = () => {
  const actionData = useActionData() as ActionData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center' }}>
            Sign Up
          </div>
          <Form method="post">
              <input
                
                placeholder="Full Name"
                name="name"
                required
              />
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
              <input
                
                placeholder="Confirm Password"
                name="confirmPassword"
                required
              />
              <button>
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </button>
              {actionData?.error && (
                <div>
                  {actionData.error}
                </div>
              )}
          </Form>
    </div>
  );
};

export default SignUp;