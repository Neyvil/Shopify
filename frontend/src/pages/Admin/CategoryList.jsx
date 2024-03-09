import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useSearchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";

const CategoryList = () => {
  const { data: categories } = useSearchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory= async (e) =>{
    e.preventDefault()

    if(!name){
      toast.error('Category name is required')
      return
    }
    try {
      const result=await createCategory({name}).unwrap()
      if (result.error){
        toast.error(result.error)
      }else{
        setName("")
        toast.success(`${result.name} is created`)
      }
      
    } catch (error) {
      console.error(error)
      toast.error("creating category failed, try again")
    }
  }

  return (
    <div className=" ml-[10rem] flex flex-col md:flex-row">
      {/* AdminMenu */}
      <div className="md:w-3/4 p-3">
        <div className="h-12 text-white font-bold text-3xl">
          Manage Categories
        </div>
        <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className=" border border-pink-500 text-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:text-white focus:outline-none focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
