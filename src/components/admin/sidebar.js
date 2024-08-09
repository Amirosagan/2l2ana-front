import { Users, Hospital, HelpCircle, Film, FileText, Tag, LogOut, Tags } from "lucide-react";
import { useRouter } from "next/navigation";
import MneuLink from "./menuLink";
import { logout } from "@/src/utils/auth";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    {
      title: "Reservation",
      list: [
        {
          title: "Users",
          path: "/admin/users",
          icon: <Users />,
        },
        {
          title: "Doctors",
          path: "/admin/doctors",
          icon: <Hospital />,
        },
      ],
    },
    {
      title: "Content",
      list: [
        {
          title: "Questions",
          path: "/admin/questions",
          icon: <HelpCircle />,
        },
        {
          title: "Videos",
          path: "/admin/videos",
          icon: <Film />,
        },
        {
          title: "Blogs",
          path: "/admin/Blogs",
          icon: <FileText />,
        },
      ],
    },
    {
      title: "Tags",
      list: [
        {
          title: "Tags",
          path: "/admin/Tags",
          icon: <Tags />,
        },
        {
          title: "Questions Tags",
          path: "/admin/question-tags",
          icon: <Tag />,
        },
      ],
    },
  ];

  return (
    <div className="sticky top-1 shadow-2xl py-5">
      <div className="flex gap-2 px-10">
        <div className="flex items-center gap-3 px-3"></div>
      </div>
      <ul className="px-3">
        <div></div>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <div className="pt-2">
              <span className="text-l text-admin2 font-bold">{cat.title}</span>
            </div>
            <div>
              {cat.list.map((item) => (
                <MneuLink item={item} key={item.title} />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="px-3 pb-1 mt-10">
        <button
          onClick={handleLogout}
          style={{ color: "rgb(235 235 235)" }}
          className="py-4 w-full px-4 flex gap-2 items-center lhover my-2 h-full shadow-lg rounded-lg border-solid border-white border cursor-pointer"
        >
          <LogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
