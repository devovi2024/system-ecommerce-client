import React, { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Upload } from "lucide-react";

const ProfileForm = () => {
  const { user, loading, fetchProfile, updateProfile } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "male",
    mobile: "",
    affiliatePhone: "",
    email: "",
    password: "",
    image: "", 
  });

  useEffect(() => {
    if (!user) fetchProfile();
    else
      setFormData({
        name: user.name || "",
        dob: user.dob || "",
        gender: user.gender || "male",
        mobile: user.mobile || "",
        affiliatePhone: user.affiliatePhone || "",
        email: user.email || "",
        password: "",
        image: user.image || "",  
      });
  }, [user, fetchProfile]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#0a2540] text-white px-4 py-12 flex justify-center min-h-screen">
      <div className="w-full max-w-4xl bg-white text-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-[#0a2540] mb-8">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#0a2540] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0a2540] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-[#0a2540] mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0a2540] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[#0a2540] mb-1">
              Gender
            </label>
            <div className="flex gap-6 mt-1">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="accent-[#0a2540]"
                  />
                  <span className="text-sm text-gray-700 capitalize">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-[#0a2540] mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0a2540] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Affiliate Account */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0a2540] mb-1">
              Affiliate Account (Phone)
            </label>
            <input
              type="text"
              name="affiliatePhone"
              value={formData.affiliatePhone}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0a2540] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Email Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0a2540] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0a2540] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Add new password"
              value={formData.password}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0a2540] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Profile Image Upload */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-gray-700">Profile Photo</label>
            <label
              className={`flex items-center gap-3 cursor-pointer bg-white/10 border border-white/20 p-3 rounded-xl hover:bg-white/20 transition-all ${
                !isEditing ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <Upload size={20} />
              <span className="text-sm text-gray-200">Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={!isEditing}
              />
            </label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile Preview"
                className="mt-4 h-40 w-40 object-cover rounded-full border border-white/20"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="px-6 py-3 bg-[#0a2540] text-white font-semibold rounded-lg hover:bg-[#0b3263] transition duration-300"
          >
            {isEditing ? "Save Changes" : "Change Profile Information"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
