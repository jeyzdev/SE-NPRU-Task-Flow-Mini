import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

export default function TaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { createTask, isCreatingTask } = useTaskStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    tags: "", // ใน Form รับเป็น String ก่อน แล้วค่อยแปลงเป็น Array
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // เตรียม Payload ให้ตรงกับ Mongoose Schema
    const payload = {
      ...formData,
      status: "todo", // บังคับเป็น todo ตาม Schema default
      // แปลง Tags จาก String "TEST, URGENT" เป็น ["TEST", "URGENT"]
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
      dueDate: formData.dueDate || null,
    };

    await createTask(payload);

    // Reset และปิด Modal
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      tags: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary gap-2">
        <Plus size={18} /> สร้างงานใหม่
      </button>

      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-lg p-0 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 pb-0">
            <h3 className="font-bold text-xl">สร้างงานใหม่</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 pt-4 flex flex-col gap-5"
          >
            {/* ชื่อเรื่อง */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600">
                  ชื่อชื่อเรื่อง
                </span>
              </label>
              <input
                name="title"
                className="input input-bordered w-full focus:input-primary"
                placeholder="ชื่อเรื่อง..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* รายละเอียด */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600">
                  รายละเอียด
                </span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered h-28 w-full resize-none focus:textarea-primary"
                placeholder="ระบุรายละเอียดงาน..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* ความสำคัญ */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-gray-600">
                    ความสำคัญ
                  </span>
                </label>
                <select
                  name="priority"
                  className="select select-bordered w-full"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* วันครบกำหนด */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-gray-600">
                    วันครบกำหนด
                  </span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  className="input input-bordered w-full"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600">
                  Tags
                </span>
              </label>
              <input
                name="tags"
                className="input input-bordered w-full"
                placeholder="เช่น TEST, URGENT"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost px-8"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn btn-primary bg-indigo-600 border-none px-8 hover:bg-indigo-700"
                disabled={isCreatingTask}
              >
                {isCreatingTask ? "กำลังสร้าง..." : "สร้างงาน"}
              </button>
            </div>
          </form>
        </div>
        <div
          className="modal-backdrop bg-black/40"
          onClick={() => setIsOpen(false)}
        ></div>
      </div>
    </>
  );
}
