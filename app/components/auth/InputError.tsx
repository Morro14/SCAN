export default function InputError({ message }: { message: string }) {
  return (
    <div className="flex flex-row justify-center items-center text-[#FF5959] text-sm mt-[6px]">
      {message}
    </div>
  );
}
