import { Carousel, Image } from "antd";

function Catalogue({ images }: { images: string[] }) {
  return (
    <div className=" w-[500px] h-[300px] m-auto">
      <Carousel arrows infinite={false}>
        {images.map((src, index) => (
          <div
            key={index}
            className="flex justify-center items-center my-auto w-[500px] h-[300px]"
          >
            <Image
              width={"500px"}
              height={"300px"}
              className="object-cover"
              src={src}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Catalogue;

//   "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D"
// ];
