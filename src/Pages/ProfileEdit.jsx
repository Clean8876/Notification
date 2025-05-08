import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2 } from "lucide-react"
import { useSelector,useDispatch } from "react-redux"
import api from "../Services/api"
import { useNavigate } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbars from "../components/Navbars"
import { selectUser,logout } from "../slices/AuthSlice"

function ProfileEdit() {
    const users = useSelector(selectUser)
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const [user, setUser] = useState({
    name: users.user.name,
    phone: "+919876543210",
   
  });
  
 
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
  });
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    
    // Name validation
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    
    // Phone validation (optional)
    if (formData.phone && !/^(?:\+91|0)?[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Indian phone number.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function onSubmit (e) {
    e.preventDefault();
    const response = await api.put('/api/users/update',{
        name: formData.name,
        phoneNumber: formData.phone,
    })
    if (response.status === 200) {
        alert("Profile updated successfully");
        }
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log(formData);

    // Update the local state
    setUser({
      ...user,
      name: formData.name,
      phone: formData.phone || "",
    });

  
  }
  

  // Handle account deletion
  async function handleDeleteAccount() {
    try {
        const response = await api.delete('/delete_user');
    
        if (response.status === 200) {
          dispatch(logout());
          alert("Account has been deleted");
          navigate('/');
        } else {
          alert(`Failed to delete account. Server responded with status ${response.status}`);
        }
      } catch (error) {
        console.error("Delete account error:", error);
        alert("An error occurred while deleting your account. Please try again later.");
      }

  }
  
  return (
    <div className="min-h-screen bg-background">
        <Navbars/>
    <div className="flex justify-center mt-6">
        
        <Card className="shadow-md w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>View and update your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>{users?.user?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
        
                </div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-medium">Hi {users.user.name}</h3>
                <p className="text-sm text-muted-foreground">edit profile</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name" 
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
              <p className="text-sm text-muted-foreground">This is your public display name.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +919876543210" 
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {user.phone ? "Update your phone number." : "Add a phone number to your account."}
              </p>
            </div>

            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 hover:scale-105">Save changes</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className=" hover:scale-105">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel >Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}  className=" bg-red-500 hover:bg-red-600 hover:scale-105">Delete Account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}

export default ProfileEdit