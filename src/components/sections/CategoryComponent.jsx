// CategoriesContent.jsx (or .tsx)
export default async function CategoriesContent({ fetcher }) {
  const data = await fetcher();
  return (
    <ul className='flex gap-4 w-full overflow-scroll scrollbar-hide'>
      {data.map(item => (
        <li className='min-w-[200px] h-[300px] rounded-lg border-2' key={item.id}>
          {item.title || item.original_name || "Untitled"}
        </li>
      ))}
    </ul>
  );
}
