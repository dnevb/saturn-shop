import * as DropdownMenu from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";
import { useAuthHeader } from "states/auth";
import f from "utils/f";
import Input, { InputProps } from "./input";
import Spinner from "./spinner";

interface SearchInputProps extends InputProps {
  url: string;
  itemRender: (item: any) => ReactNode;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { itemRender, label, ...rest } = props;
  const headers = useAuthHeader();
  const [search, setsearch] = useState("");
  const [open, setopen] = useState(false);
  const [active, setactive] = useState(!props.value);

  const { data, isLoading } = useQuery(["search", props.url, search], () =>
    f(props.url, { params: { q: search }, headers }).then(
      ({ data }) => data
    )
  );

  const content = isLoading ? (
    <Spinner />
  ) : (
    data?.estimatedTotalHits && (
      <ul className="bg-light shadow-lg rounded-lg wxs p2">
        {data.hits.map((item: any) => (
          <li
            className="p2 hover:bg-gray-200 cursor-pointer rounded-lg"
            key={item["_id"]}
            onClick={() => (
              setactive(false),
              setsearch(""),
              props.onChange?.(item as any),
              setopen(false)
            )}
          >
            {itemRender(item)}
          </li>
        ))}
      </ul>
    )
  );

  return (
    <DropdownMenu.Root open={open} modal={false}>
      <div>
        <label className="text-sm">{label}</label>
        {!active ? (
          <div
            onClick={() => setactive(true)}
            className="p2.5 bg-gray-50 border border-gray-300 rounded-lg"
          >
            {itemRender(props.value)}
          </div>
        ) : (
          <Input
            {...rest}
            value={search}
            onChange={(e) => (setsearch(e.target.value), setopen(true))}
          />
        )}
      </div>
      <DropdownMenu.Anchor />
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={() => (
            setopen(false), props.value && setactive(false)
          )}
        >
          {content}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SearchInput;
