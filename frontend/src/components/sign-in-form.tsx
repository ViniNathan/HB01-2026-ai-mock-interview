import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  return (
    <Card variant="glass" radius="xl">
      <CardHeader>
        <Badge>Auth stub</Badge>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          The backend auth MVC is still being rewired. This screen now exercises
          the shared form primitives and page shell while the real flow lands.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-text-base">
            Email
          </Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="candidate@hone.ai"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-password" className="text-text-base">
            Password
          </Label>
          <Input
            id="signin-password"
            type="password"
            placeholder="Your password"
          />
        </div>

        <div className="rounded-[var(--radius-card)] border border-border-subtle bg-surface-soft px-4 py-3 text-sm leading-6 text-text-muted">
          Submit is intentionally inert for now. The goal of this route is to
          validate visual consistency before wiring the backend auth flow.
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Button shape="pill" className="flex-1">
          Continue
        </Button>
        <Button
          variant="link"
          onClick={onSwitchToSignUp}
          className="justify-center sm:justify-end"
        >
          Need an account? Sign up
        </Button>
      </CardFooter>
    </Card>
  );
}
