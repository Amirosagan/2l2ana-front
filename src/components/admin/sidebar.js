import { Users, Hospital, HelpCircle, Film, FileText, Tag, LogOut, Tags, Radio, Folders, Store } from "lucide-react";
import { useRouter } from "@/src/i18n/routing";
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
          path: "/asdkjklasdlkja21321jlkasd/users",
          icon: <Users/>,
        },
        {
          title: "Doctors",
          path: "/asdkjklasdlkja21321jlkasd/doctors",
          icon: <Hospital/>,
        },
        {
          title: "Consultations",
          path: "/asdkjklasdlkja21321jlkasd/consultations",
          icon: <Folders />,
        },
        {
          title: "Store",
          path: "/asdkjklasdlkja21321jlkasd/store",
          icon: <Store />,
        },
      ],
    },
    {
      title: "Content",
      list: [
        {
          title: "Questions",
          path: "/asdkjklasdlkja21321jlkasd/questions",
          icon: <HelpCircle/>,
        },
        {
          title: "Videos",
          path: "/asdkjklasdlkja21321jlkasd/videos",
          icon: <Film/>,
        },
        {
          title: "Blogs",
          path: "/asdkjklasdlkja21321jlkasd/blogs",
          icon: <FileText/>,
        },
        {
          title: "Podcasts",
          path: "/asdkjklasdlkja21321jlkasd/podcasts",
          icon: <Radio/>,
        },
      ],
    },
    {
      title: "Tags",
      list: [
        {
          title: "Tags",
          path: "/asdkjklasdlkja21321jlkasd/tags",
          icon: <Tags/>,
        },
        {
          title: "Questions Tags",
          path: "/asdkjklasdlkja21321jlkasd/question-tags",
          icon: <Tag/>,
        },
      ],
    },
  ];

  return (
    <div className="sticky top-1 shadow-2xl ">
      <div className="flex gap-2 px-10">
        <div className="flex items-center gap-3 px-3"></div>
      </div>
      <ul className="px-3">
        <div></div>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <div className="pt-1">
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
      <div className="px-3 pb-1 ">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 flex gap-2 items-center   underline font-normal  my-2 h-full   cursor-pointer"
        >
          <LogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
