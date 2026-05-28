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

export default function SignUpForm({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  return (
    <Card variant="glass" radius="xl">
      <CardHeader>
        <Badge tone="success">Preview state</Badge>
        <CardTitle>Create your practice workspace</CardTitle>
        <CardDescription>
          This is still a frontend-only stub, but it now uses the same cards,
          badges, inputs, and spacing contracts as the public landing page.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-text-base">
              First name
            </Label>
            <Input id="signup-name" type="text" placeholder="Vinicius" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-role" className="text-text-base">
              Primary focus
            </Label>
            <Input id="signup-role" type="text" placeholder="Frontend" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-text-base">
            Email
          </Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="candidate@hone.ai"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-text-base">
            Password
          </Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="Create a password"
          />
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Button shape="pill" className="flex-1">
          Create account
        </Button>
        <Button
          variant="link"
          onClick={onSwitchToSignIn}
          className="justify-center sm:justify-end"
        >
          Already have an account? Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
