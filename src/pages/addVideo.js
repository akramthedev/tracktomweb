import React from 'react'

const AddVideo = () => {
    return (
        <div className="p-4 ">
            <form id="farms" action="" method="POST">
                <div className="grid grid-cols-1 space-y-4">
                    <div className="">
                        <label htmlFor='farm_id' >Farm</label>
                        <input type="text" name="farm_id" id="name" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3 " placeholder="Entre le nom de la ferme" required="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="calculated-perimeter">variety</label>
                        <input type="text" name="variety" id="calculated-perimeter" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="__ m" required="" />
                    </div>
                    <div className=" ">
                        <label htmlFor="calculated-area">portgreff</label>
                        <input type="text" name="portgreff" id="calculated-area" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="__ km" required="" />
                    </div>
                    <div className=" ">
                        <label htmlFor="calculated-area">Video</label>
                        <input type="file" name="Video" id="calculated-area" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="__ km" required="" />
                    </div>
                    <div className=" ">
                        <label htmlFor="calculated-area">data Video</label>
                        <input type="date" name="dataVideo" id="calculated-area" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="__ km" required="" />
                    </div>
                <div className=" ">
                    <button type="submit" className="rounded-md h-[40px] px-3 text-white bg-green4 hover:bg-white hover:text-green4   hover:border-green4 border border-transparent " >Enregistrer</button>
                </div>
                </div>
            </form>
        </div>
    )
}
export default AddVideo;