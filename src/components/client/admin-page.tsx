'use client';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GetIcon } from '@/lib/icons';
import { defaultConfig } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const socialLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  visible: z.boolean(),
});

const copyButtonSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  value: z.string(),
  visible: z.boolean(),
});

const appConfigSchema = z.object({
  socials: z.array(socialLinkSchema),
  copyButtons: z.array(copyButtonSchema),
});

type FormValues = z.infer<typeof appConfigSchema>;

export function AdminPage() {
  const { config, setConfig } = useAppContext();
  const { toast } = useToast();

  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(appConfigSchema),
    defaultValues: {
      socials: config.socials,
      copyButtons: config.copyButtons,
    },
  });

  const { fields: socialFields } = useFieldArray({
    control,
    name: 'socials',
  });

  const { fields: copyButtonFields } = useFieldArray({
    control,
    name: 'copyButtons',
  });

  const onSubmit = (data: FormValues) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      socials: data.socials,
      copyButtons: data.copyButtons,
    }));
    toast({
      title: 'Success!',
      description: 'Your changes have been saved.',
    });
  };

  const handleReset = () => {
    reset({
      socials: defaultConfig.socials,
      copyButtons: defaultConfig.copyButtons,
    });
    setConfig(defaultConfig);
    toast({
      title: 'Settings Reset',
      description: 'Your settings have been reset to the default configuration.',
    });
  };

  return (
    <div className="flex min-h-screen w-full justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Admin Panel</CardTitle>
            <CardDescription>
              Manage your social links and user IDs. Changes are saved locally.
            </CardDescription>
            <Button asChild variant="link" className="absolute right-6 top-6">
              <Link href="/">
                <GetIcon name="home" className="mr-2" />
                Back to Site
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-semibold">Social Media Links</h3>
                <div className="space-y-4">
                  {socialFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <GetIcon name={field.icon} className="h-6 w-6 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`socials.${index}.url`}>{field.label}</Label>
                        <Input
                          id={`socials.${index}.url`}
                          {...register(`socials.${index}.url`)}
                          placeholder="https://example.com"
                        />
                      </div>
                      <Controller
                        control={control}
                        name={`socials.${index}.visible`}
                        render={({ field: { onChange, value } }) => (
                          <Switch
                            checked={value}
                            onCheckedChange={onChange}
                            aria-label={`Toggle ${field.label} visibility`}
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-2xl font-semibold">Copyable User IDs</h3>
                <div className="space-y-4">
                  {copyButtonFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <GetIcon name={field.icon} className="h-6 w-6 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`copyButtons.${index}.value`}>{field.label}</Label>
                        <Input
                          id={`copyButtons.${index}.value`}
                          {...register(`copyButtons.${index}.value`)}
                          placeholder="YourUsername#1234"
                        />
                      </div>
                       <Controller
                        control={control}
                        name={`copyButtons.${index}.visible`}
                        render={({ field: { onChange, value } }) => (
                          <Switch
                            checked={value}
                            onCheckedChange={onChange}
                            aria-label={`Toggle ${field.label} visibility`}
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset to Default
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
