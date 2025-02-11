"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "../../../../hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const OnboardingFrom = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });
  const watchIndustry = watch("industry");
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const formattedIndustry =`${
        values.industry
      }-${values.subIndustry.toLowerCase()
        .replace(/ /g,"-")
      }`;
      await updateUserFn(
        {...values,
        industry:formattedIndustry,
    });
    } catch (error) {
      console.log("Onboarding Eroor", error);
    }
  };
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("You have successfully setup your Profile ");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateLoading, updateResult]);
  return (
    <div className="flex justify-center bg-background">
      <Card className=" w-full max-w-lg mx-auto  mb-4">
        <CardHeader>
          <CardTitle className="gradient-title text-2xl">
            Complete Your Profile{" "}
          </CardTitle>
          <CardDescription>Select Your Personalised Industry</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="industry" className="mb-2">
                Industry
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry ">
                  <SelectValue
                    placeholder="Select an Industry"
                    className="text-muted"
                  />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => {
                    return (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>
            {watchIndustry && (
              <div className="space-y-2 mt-2">
                <Label htmlFor="subIndustry" className="mb-2">
                  Specialization
                </Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger id="subIndustry ">
                    <SelectValue
                      placeholder="Select a Specialization"
                      className="text-mutede"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => {
                      return (
                        <SelectItem value={ind} key={ind}>
                          {ind}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="experience">
                Years of Exprience
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="60"
                  placeholder="Enter years of experience"
                  {...register("experience")}
                />
              </Label>
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g ,Python , Javascript , Product Management"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                use comma for separating different skills
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                className="h-32"
                id="bio"
                placeholder="Add your professional background..."
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className=" w-full variant"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                " Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFrom;
