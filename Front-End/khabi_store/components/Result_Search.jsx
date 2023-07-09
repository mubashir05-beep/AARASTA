import React from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";

const Result_Search = ({ searchResults }) => {
  return (
    <div className="mt-4">
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 my-2 border border-b rounded"
          >
            <Link href={`/${item.category}/${item.slug}`}>
              <img
                className="w-16 h-16 object-cover rounded"
                src={urlFor(item.image && item.image[0])}
                alt={item.name}
              />
            </Link>

            <div className="flex flex-col gap-1">
              <Link href={`/shirts/${item.slug.current}`}>
                <div className="text-sm font-medium text-gray-800 hover:text-gray-600">
                  {item.name}
                </div>
              </Link>
              <Link href={`/shirts`}>
                <div className="text-xs text-gray-500 hover:text-gray-600">
                  {item.category}
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="p-3 text-center text-gray-500">No items</div>
      )}
    </div>
  );
};

export default Result_Search;
