"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { statesAndUnionTerritories } from "@/constants/form";
import BackButton from "@/components/BackButton";
import { useEffect, useRef } from "react";

const AddVenue = () => {
  const firstInputRef = useRef<HTMLButtonElement>(null);
  // const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      city: "",
      state: "",
      address: "",
      phone: "",
      website: "",
      googleMapLink: "",
      logo: null,
      layout: null,
      featured: false,
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company Name is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string().matches(
        /^\d{10}$/,
        "Phone number must be exactly 10 digits"
      ),
      website: Yup.string()
        .url("Must be a valid URL")
        .required("Website is required"),
      googleMapLink: Yup.string()
        .required("Google Map link is required")
        .url("Must be a valid URL"),
      logo: Yup.mixed().required("Venue photo is required"),
      layout: Yup.mixed(),
      featured: Yup.boolean(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    formik.setFieldValue("logo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    formik.setFieldValue("layout", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Add Venue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-gray-900">
                  Venue Name*
                </Label>
                <Input
                  ref={firstInputRef}
                  id="companyName"
                  {...formik.getFieldProps("companyName")}
                  tabIndex={1}
                  className={
                    formik.touched.companyName && formik.errors.companyName
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <p className="text-sm text-red-600">
                    {formik.errors.companyName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-900">
                  City*
                </Label>
                <Input
                  id="city"
                  {...formik.getFieldProps("city")}
                  tabIndex={2}
                  className={
                    formik.touched.city && formik.errors.city
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-sm text-red-600">{formik.errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-900">
                  State*
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("state", value)
                  }
                  defaultValue={formik.values.state}
                >
                  <SelectTrigger
                    tabIndex={3}
                    aria-required="true"
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {statesAndUnionTerritories.map((state) => (
                      <SelectItem
                        key={state}
                        value={state}
                        className=" text-black hover:cursor-pointer"
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.state && formik.errors.state && (
                  <p className="text-sm text-red-600">{formik.errors.state}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900">
                  Phone (Landline)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...formik.getFieldProps("phone")}
                  tabIndex={4}
                  className={
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-600">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-900">
                Address*
              </Label>
              <Textarea
                id="address"
                {...formik.getFieldProps("address")}
                tabIndex={5}
                className={
                  formik.touched.address && formik.errors.address
                    ? "border-red-500 text-black"
                    : " text-black"
                }
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-sm text-red-600">{formik.errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website" className="text-gray-900">
                  Website*
                </Label>
                <Input
                  id="website"
                  type="url"
                  {...formik.getFieldProps("website")}
                  tabIndex={6}
                  className={
                    formik.touched.website && formik.errors.website
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.website && formik.errors.website && (
                  <p className="text-sm text-red-600">
                    {formik.errors.website}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleMapLink" className="text-gray-900">
                  Google Map Link*
                </Label>
                <Input
                  id="googleMapLink"
                  type="url"
                  {...formik.getFieldProps("googleMapLink")}
                  tabIndex={7}
                  className={
                    formik.touched.googleMapLink && formik.errors.googleMapLink
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.googleMapLink &&
                  formik.errors.googleMapLink && (
                    <p className="text-sm text-red-600">
                      {formik.errors.googleMapLink}
                    </p>
                  )}
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="logo" className="text-gray-900">
                  Upload Venue Photo*
                </Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={handleLogoChange}
                  tabIndex={8}
                  className={
                    formik.touched.logo && formik.errors.logo
                      ? "border-red-500"
                      : ""
                  }
                  accept="image/*"
                />
                {formik.touched.logo && formik.errors.logo && (
                  <p className="text-sm text-red-600">{formik.errors.logo}</p>
                )}
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="layout" className="text-gray-900">
                  Upload Venue Layout
                </Label>
                <Input
                  id="layout"
                  name="layout"
                  type="file"
                  onChange={handleUploadLayout}
                  tabIndex={9}
                  className="cursor-pointer bg-white text-black"
                  accept="image/*"
                />
                {formik.touched.layout && formik.errors.layout && (
                  <p className="text-sm text-red-600">{formik.errors.layout}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formik.values.featured}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("featured", checked)
                }
                tabIndex={10}
              />
              <Label htmlFor="featured" className="text-gray-900">
                Featured*
              </Label>
            </div>

            <Button type="submit" className="w-full bg-primary" tabIndex={11}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddVenue;
