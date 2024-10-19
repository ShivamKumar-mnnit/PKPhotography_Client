import { Sidebar, Dropdown } from "flowbite-react";
// import { useRouter } from "next/router"; // Import useRouter from next/router
import { HiArrowSmRight } from "react-icons/hi";
import Link from "next/link"; // Use Link from next/link
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function DashSidebar1() {
  // const router = useRouter(); // Use useRouter instead of useNavigate
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);

  // const handleSignOut = async () => {
  //   try {
  //     const res = await fetch("/api/user/signout", { method: "POST" });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log(data.message);
  //     } else {
  //       dispatch(signOutSuccess());
  //       router.push("/"); // Use router.push to navigate
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const handlenavigate = () => {
  //   router.push("/sign-in"); // Use router.push to navigate
  // };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link href="/" passHref>
            <Sidebar.Item as="div">PK Photography</Sidebar.Item>
          </Link>
          <Link href="https://pkphotography.in" passHref>
            <Sidebar.Item as="div">Gallery</Sidebar.Item>
          </Link>

          {/* Services Dropdown with Padding */}
          <div className="flex flex-col pl-5"> {/* Add left padding here */}
            <Dropdown label="Services" arrowIcon={true} inline={true} className="text-black">
              <Dropdown.Item>
                <Link href="https://pkphotography.in/corporate-headshots/" passHref>
                  <a target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    HeadShots
                  </a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://pkphotography.in/portrait-gallery/" passHref>
                  <a target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    Portrait
                  </a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://pkphotography.in/gallery/" passHref>
                  <a target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    Wedding & Events
                  </a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://pkphotography.in/portfolio-gallery/" passHref>
                  <a target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    Portfolio
                  </a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://pkphotography.in/interior-design/" passHref>
                  <a target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    Interior
                  </a>
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </div>

          <Link href="https://pkphotography.in" passHref>
            <Sidebar.Item as="div">About Us</Sidebar.Item>
          </Link>
          <Link href="https://pkphotography.in" passHref>
            <Sidebar.Item as="div">Contact Us</Sidebar.Item>
          </Link>
          <Link href="https://pkphotography.in" passHref>
            <Sidebar.Item as="div">Careers</Sidebar.Item>
          </Link>

          {/* {currentUser ? (
            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </Sidebar.Item>
          ) : (
            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={handlenavigate}
            >
              Sign In
            </Sidebar.Item>
          )} */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
