import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../redux/api/usersApiSlice";
import { Eye, EyeOff, Mail, CircleUser } from "lucide-react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated successfully 🤞");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className=" container mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <CircleUser />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <Mail />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400"
                    onMouseDown={togglePasswordVisiblity}
                    onMouseUp={togglePasswordVisiblity}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <div className=" relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length > 0 && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400"
                    onMouseDown={toggleConfirmPasswordVisibility}
                    onMouseUp={toggleConfirmPasswordVisibility}
                    
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                Update
              </button>
              <Link
                to="/users-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
