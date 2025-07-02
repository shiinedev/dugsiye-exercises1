import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/apiClient";
import { errorExtract } from "@/utils/errorUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatar, setAvatar] = useState(null);

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: "profile",
    queryFn: async () => {
      const response = await api.get("/auth/profile");
      return response.data;
    },
    retry: 1,
  });
  

  const updateMutation = useMutation({
    mutationFn: async (formData) =>{
      
      const response = await api.post("/upload/profile",formData);
      console.log(formData);
      
      return response.data;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["profile"]);
      console.log("profile uploaded successfully");
      
    },
    onError:(err) =>{
      console.log("upload Error",errorExtract(err));
      
    }
  })

  useEffect(()=>{
    if(data){
      setUsername(data.name);
      setAvatarUrl(data.profile);
    }
  },[data])

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be smaller than 2MB");
        return;
      }
      setAvatar(file);

      const previewUrl = URL.createObjectURL(file);

      setAvatarUrl(previewUrl);
    }
  };


  const handleSubmit = (e) =>{
    e.preventDefault();

    if(avatar){      
     const formData = new FormData();
     formData.append("file", avatar); 
      updateMutation.mutate(formData);
    }
  }


  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center mt-8 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl md:mx-auto space-y-8 p-6  backdrop-blur-xs rounded-xl border  shadow-xs">
          <div className="flex items-center justify-center gap-6">
            <Avatar className="h-24 w-24 rounded-full border-2  shadow-xs">
              <AvatarImage
                src={avatarUrl}
                className="rounded-full object-cover"
              />
              <AvatarFallback>
                <User size={30} />
              </AvatarFallback>
            </Avatar>
            <Label
              htmlFor="avatar"
              className=" flex justify-center h-24 w-24 rounded-full border-2 border-dashed border-zinc-200/80 dark:border-zinc-800/80 
                             hover:border-zinc-300  hover:bg-zinc-50 dark:hover:bg-zinc-900/50
                             transition-colors shadow-sm">
              <Camera className="h-6 w-6 tex " />
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                disabled
                id="username"
                placeholder="@username"
                defaultValue={username}
                 onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled
                id="email"
                placeholder="email"
                autoComplete="off"
                defaultValue={data?.email}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" disabled={!avatar}>
              {updateMutation.isPending ? "saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
