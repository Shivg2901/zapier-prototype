const ZapCell = ({ name, index, onClick, image }: { 
  name: string, 
  index: number, 
  image?: string, // Make image optional
  onClick: () => void 
}) => {
  return (
      <div 
          onClick={onClick} 
          className="border border-black py-4 px-8 flex w-[300px] justify-start items-center cursor-pointer"
      >
          <div className="flex text-xl items-center">
              <div className="font-bold px-2 min-w-[30px] text-right">
                  {index}.
              </div>
              {image && (
                  <div className="px-2">
                      <img src={image} width={30} height={30} className="rounded-full" alt={name} />
                  </div>
              )}
              <div className="px-2">
                  {name}
              </div>
          </div>
      </div>
  );
}

export default ZapCell;
