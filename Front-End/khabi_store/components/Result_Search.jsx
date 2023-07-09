import React from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";

const Result_Search = ({ searchResults }) => {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 items-center z-auto border border-b"
          >
            <Link href={`/${item.category}/${item.slug}`}>
              <img
                className="w-[70px] object-cover"
                src={urlFor(item.image && item.image[0])}
                alt={item.name}
              />
            </Link>

            <div className="flex flex-col gap-3">
              <Link href={`/shirts/${item.slug.current}`}>
                <div>{item.name}</div>
              </Link>
              <Link href={`/shirts`}>
                <div>{item.category}</div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No items</div>
      )}
    </div>
  );
};

export default Result_Search;
