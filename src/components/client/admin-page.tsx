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
import { GetIcon, iconMap } from '@/lib/icons';
import { defaultConfig } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Trash } from 'lucide-react';

const socialLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label is required'),
  icon: z.string().min(1, 'Icon is required'),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  visible: z.boolean(),
});

const copyButtonSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label is required'),
  icon: z.string().min(1, 'Icon is required'),
  value: z.string().min(1, 'Value is required'),
  visible: z.boolean(),
});

const spotifyPlaylistSchema = z.object({
  id: z.string(),
  url: z.string().url({ message: 'Please enter a valid embed URL.' }),
  visible: z.boolean(),
});

const appConfigSchema = z.object({
  socials: z.array(socialLinkSchema),
  copyButtons: z.array(copyButtonSchema),
  playlists: z.array(spotifyPlaylistSchema),
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
      playlists: config.playlists,
    },
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: 'socials',
  });

  const {
    fields: copyButtonFields,
    append: appendCopyButton,
    remove: removeCopyButton,
  } = useFieldArray({
    control,
    name: 'copyButtons',
  });

  const {
    fields: playlistFields,
    append: appendPlaylist,
    remove: removePlaylist,
  } = useFieldArray({
    control,
    name: 'playlists',
  });

  const onSubmit = (data: FormValues) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      socials: data.socials,
      copyButtons: data.copyButtons,
      playlists: data.playlists,
    }));
    toast({
      title: 'Success!',
      description: 'Your changes have been saved.',
    });
  };

  const handleReset = () => {
    const newConfig = {
      socials: defaultConfig.socials,
      copyButtons: defaultConfig.copyButtons,
      playlists: defaultConfig.playlists,
    }
    reset(newConfig);
    setConfig((prev) => ({...prev, ...newConfig}));
    toast({
      title: 'Settings Reset',
      description: 'Your settings have been reset to the default configuration.',
    });
  };

  const iconList = Object.keys(iconMap);

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
                <div className="flex items-center justify-between">
                  <h3 className="mb-4 text-2xl font-semibold">Social Media Links</h3>
                  <Button
                    type="button"
                    onClick={() =>
                      appendSocial({
                        id: `social-${Date.now()}`,
                        label: '',
                        icon: 'default',
                        url: '',
                        visible: true,
                      })
                    }
                  >
                    Add Social
                  </Button>
                </div>
                <div className="space-y-4">
                  {socialFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <GetIcon name={field.icon} className="mt-2 h-6 w-6 flex-shrink-0" />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`socials.${index}.label`}>Label</Label>
                          <Input
                            id={`socials.${index}.label`}
                            {...register(`socials.${index}.label`)}
                            placeholder="e.g. Twitter"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`socials.${index}.icon`}>Icon</Label>
                          <select
                            id={`socials.${index}.icon`}
                            {...register(`socials.${index}.icon`)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background"
                          >
                            {iconList.map((iconName) => (
                              <option key={iconName} value={iconName}>
                                {iconName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`socials.${index}.url`}>URL</Label>
                          <Input
                            id={`socials.${index}.url`}
                            {...register(`socials.${index}.url`)}
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
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
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSocial(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="mb-4 text-2xl font-semibold">Copyable User IDs</h3>
                  <Button
                    type="button"
                    onClick={() =>
                      appendCopyButton({
                        id: `copy-${Date.now()}`,
                        label: '',
                        icon: 'default',
                        value: '',
                        visible: true,
                      })
                    }
                  >
                    Add User ID
                  </Button>
                </div>

                <div className="space-y-4">
                  {copyButtonFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <GetIcon name={field.icon} className="mt-2 h-6 w-6 flex-shrink-0" />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`copyButtons.${index}.label`}>Label</Label>
                          <Input
                            id={`copyButtons.${index}.label`}
                            {...register(`copyButtons.${index}.label`)}
                            placeholder="e.g. Discord Username"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`copyButtons.${index}.icon`}>Icon</Label>
                          <select
                            id={`copyButtons.${index}.icon`}
                            {...register(`copyButtons.${index}.icon`)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background"
                          >
                            {iconList.map((iconName) => (
                              <option key={iconName} value={iconName}>
                                {iconName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`copyButtons.${index}.value`}>Value</Label>
                          <Input
                            id={`copyButtons.${index}.value`}
                            {...register(`copyButtons.${index}.value`)}
                            placeholder="YourUsername#1234"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
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
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeCopyButton(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="mb-4 text-2xl font-semibold">Spotify Playlists</h3>
                  <Button
                    type="button"
                    onClick={() =>
                      appendPlaylist({
                        id: `playlist-${Date.now()}`,
                        url: 'https://open.spotify.com/embed/playlist/...',
                        visible: true,
                      })
                    }
                  >
                    Add Playlist
                  </Button>
                </div>
                <div className="space-y-4">
                  {playlistFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <GetIcon name="spotify" className="mt-2 h-6 w-6 flex-shrink-0" />
                      <div className="flex-1">
                          <Label htmlFor={`playlists.${index}.url`}>Embed URL</Label>
                          <Input
                            id={`playlists.${index}.url`}
                            {...register(`playlists.${index}.url`)}
                            placeholder="https://open.spotify.com/embed/playlist/..."
                          />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Controller
                          control={control}
                          name={`playlists.${index}.visible`}
                          render={({ field: { onChange, value } }) => (
                            <Switch
                              checked={value}
                              onCheckedChange={onChange}
                              aria-label="Toggle playlist visibility"
                            />
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removePlaylist(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
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
