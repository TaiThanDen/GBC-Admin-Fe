import { Link } from "react-router";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import AddVideoModal from "../components/modules/Videos/AddVideo";
import type { NewVideo } from "~/components/modules/Videos/AddVideo";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../components/resuable/DeleteModal"; // Import DeleteModal

const VIDEOS_ITEMS = [
  {
    id: "1ddada",
    link: "https://youtu.be/SL3t_Fxerds",
    title: "Nông sản Việt vươn ra thế giới",
    content:
      "Việt Nam đẩy mạnh truy xuất nguồn gốc, chuẩn hóa quy trình canh tác và đóng gói, giúp lô hàng đi xa hơn với giá trị cao hơn. Doanh nghiệp hợp tác với hợp tác xã để đồng bộ mã vùng trồng, nhật ký điện tử và chứng chỉ an toàn. Nhiều lô hàng được đàm phán trực tiếp với nhà nhập khẩu nhờ dữ liệu minh bạch, giảm rủi ro trả hàng và tối ưu chi phí logistics.",
    date: "19/10/2025",
    tag: "Nông nghiệp",
  },
  {
    id: "2adadw",
    link: "https://youtu.be/5I8vubBZOb4",
    title: "Ứng dụng blockchain trong truy xuất thực phẩm",
    content:
      "Blockchain giúp từng bước trong chuỗi cung ứng được ghi lại không thể sửa đổi. Nhà sản xuất, kho lạnh, đơn vị vận chuyển và nhà bán lẻ cùng ký số vào mỗi mốc. Người tiêu dùng quét mã có thể xem nguồn gốc, nhiệt độ bảo quản và thời gian vận chuyển. Mô hình này giảm gian lận nhãn mác và rút ngắn quy trình thu hồi khi có sự cố.",
    date: "18/10/2025",
    tag: "Công nghệ",
  },
  {
    id: "3dadaww",
    link: "https://youtu.be/Z4E36yUvOJQ",
    title: "Chống hàng giả bằng mã QR thông minh",
    content:
      "Tem QR động sinh mã theo lô và thời điểm xuất xưởng, mỗi lần quét tạo dấu vết giúp phát hiện bất thường. Hệ thống cảnh báo khi một mã bị quét trùng nhiều nơi trong thời gian ngắn. Doanh nghiệp theo dõi bản đồ quét theo khu vực để lên kế hoạch bảo vệ thương hiệu, còn người mua kiểm tra được đại lý ủy quyền và hướng dẫn bảo hành.",
    date: "17/10/2025",
    tag: "Chống hàng giả",
  },
  {
    id: "4dadadadaw",
    link: "https://youtu.be/-zyyxMcAfY8",
    title: "Chuẩn hóa dữ liệu vùng trồng giúp mở rộng thị trường",
    content:
      "Nhiều địa phương hoàn thiện hồ sơ mã vùng trồng, cập nhật sản lượng theo mùa, dư lượng và lịch phun bón. Dữ liệu chuẩn cho phép đối tác quốc tế lập kế hoạch thu mua sớm, tránh đứt gãy và dồn ứ. Khi dữ liệu mở và đồng bộ, giá đàm phán ổn định hơn và chi phí kiểm định giảm đáng kể.",
    date: "16/10/2025",
    tag: "Chuỗi cung ứng",
  },
];

export default function VideosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(VIDEOS_ITEMS);
  const [deleteItem, setDeleteItem] = useState<any>(null); // State cho item cần xóa

  const handleAddVideo = (newVideo: NewVideo) => {
    const newId = (Math.random() + Date.now()).toString();
    const video = {
      id: newId,
      link: newVideo.link,
      title: newVideo.title,
      content: "", // hoặc lấy từ form nếu có
      date: new Date().toLocaleDateString("vi-VN"),
      tag: newVideo.tag,
    };
    setData((prev) => [...prev, video]);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteItem(item); // Mở modal xóa
  };

  const handleDelete = () => {
    if (deleteItem) {
      setData((prev) => prev.filter((v) => v.id !== deleteItem.id));
      setDeleteItem(null); // Đóng modal
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">
            Quản lý video hướng dẫn
          </h1>
          <p className="text-md font-medium text-gray-500 mb-6">
            Quản lý tất cả các video hướng dẫn về truy xuất nguồn gốc
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex gap-1 items-center"
        >
          <IoIosAddCircleOutline className="text-xl" />
          Tạo tài liệu mới
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4">
            {/* Hiển thị video YouTube */}
            <div className="aspect-video mb-3 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={item.link
                  .replace("watch?v=", "embed/")
                  .replace("youtu.be/", "www.youtube.com/embed/")}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {item.content && item.content.length > 140
                ? item.content.slice(0, 140) + "…"
                : item.content}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
              <span>{item.date}</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                {item.tag}
              </span>
            </div>
            <div className="flex justify-start items-center gap-3 mt-4">
              <Link to={`/video/${item.id}`}>
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg text-md hover:bg-green-600 flex justify-center items-center gap-2">
                  <MdOutlineEdit className="text-md" />
                  Chỉnh sửa
                </button>
              </Link>
              <button
                onClick={() => handleDeleteClick(item)} // Gọi modal xóa
                className="px-8 py-3 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 flex justify-center items-center gap-2"
              >
                <FaTrash className="text-md" />
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal thêm video */}
      <AddVideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddVideo}
        tags={[
          "Nông nghiệp",
          "Công nghệ",
          "Truy xuất nguồn gốc",
          "Tin tức",
          "Hợp tác xã",
        ]}
      />

      {/* Modal xóa video */}
      {deleteItem && (
        <DeleteModal
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
