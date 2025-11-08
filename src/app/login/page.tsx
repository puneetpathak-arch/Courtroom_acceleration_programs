"use client";

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';
import { users } from '@/lib/data';
import type { User } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function LoginPage() {
  const { login } = useUser();
  const router = useRouter();

  const handleLogin = (user: User) => {
    login(user);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Select a user to log in</CardTitle>
          <CardDescription>
            This is a simulated login. Choose a profile to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.uid}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <div className="flex gap-2 mt-1">
                    {user.roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button onClick={() => handleLogin(user)}>Login as {user.name.split(' ')[0]}</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
