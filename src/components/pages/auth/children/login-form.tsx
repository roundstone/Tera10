import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigation } from "@/utils/navigation";
import { ROUTES } from "@/config/route";
import { Link } from "react-router-dom";
import { authApi } from "@/api/authApi";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const { goTo } = useNavigation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const fdata = new FormData();
    fdata.append('email', data.email);
    fdata.append('password', data.password);

    const response = await authApi.login(fdata);
    if (response.success) {
      localStorage.setItem("token", response.data?.token);
      localStorage.setItem("userId", response.data?.user.id);
      localStorage.setItem("email", response.data?.user.email);
      localStorage.setItem("name", response.data?.user.first_name);
    }
    toast.success("Login successful!");
    console.log(data);
    goTo(ROUTES.DASHBOARD.DEVELOPER.HOME);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••••"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* */}
          <div className="text-right pt-2">
            <Link
              to={ROUTES.AUTH.FORGET_PASSWORD}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full rounded-full">
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
