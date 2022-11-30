import Image from "next/image";
import { resetIdCounter, useCombobox } from "downshift";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { useMemo, useState, useEffect } from "react";
import debounce from "lodash.debounce";
import Link from "next/link";

const { default: gql } = require("graphql-tag");

const SEARCH_PRODUCTS_QUERY = gql`
query SEARCH_PRODUCTS_QUERY ($searchTerm: String!){
    products (where: {OR: [{name: {contains: $searchTerm}}, {description: {contains: $searchTerm}}]}, take: 5){
    name
    description
    id
     photo {
      altText
      image {
        publicUrlTransformed
      }
    }
  }
}`
export default function search() {

    const [inputItems, setInputItems] = useState([])
    const [inputValue, setInputValue] = useState()

    const router = useRouter()
    const [findItems, { loading, data, error }] = useLazyQuery(
        SEARCH_PRODUCTS_QUERY,
        {
            fetchPolicy: 'no-cache',

        }
    );
    const findItemsButChill = useMemo(() => debounce(findItems, 350), [findItems]);

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        selectedItem,
        selectItem,
    } = useCombobox({
        items: inputItems ?? [],
        onInputValueChange: ({ inputValue }) => {
            setInputValue(inputValue)
            findItems({ variables: { searchTerm: inputValue } }).then(({ data }) => setInputItems(data.products))
        },
        onSelectedItemChange: (state) => {
            // console.log(state)
            if (state.type == useCombobox.stateChangeTypes.InputBlur) return
            state.selectedItem && router.push(`/product/${state.selectedItem.id}`)
            // selectItem(null)

        },
        itemToString: (item) => item?.name || '',

    })



    return (
        <div

            className=" flex justify-center flex-col items-center w-full relative"
        >
            <div className="relative flex items-center justify-center w-full lg:max-w-[600px]">

                <input
                    className="w-full bg-yellow rounded-lg p-2 text-purple-dark font-body"
                    {...getInputProps()}
                    data-testid="combobox-input"
                />
                {inputValue && <button
                    className="absolute right-10 text-lg text-purple-dark opacity-50 hover:opacity-100 p-2 "
                    aria-label="toggle menu"
                    data-testid="clear-button"
                    onClick={() => selectItem(null)}
                >
                    <Image className="text-purple" src="/close.svg" width={12} height={12} alt="Menu" />
                </button>}
                <button className="rounded-lg absolute right-0 top-0 bg-purple h-full flex w-10 justify-center items-center "><Image src="/search.svg" alt="search icon" width={15} height={15}></Image></button>
            </div>


            <ul
                {...getMenuProps()} className="absolute top-10 w-full lg:max-w-[600px] bg-purple justify-center z-50 flex flex-col  mt-1 rounded-lg"

            >
                {(isOpen) &&
                    inputItems?.map((item, index) => (
                        <li
                            style={{
                                backgroundColor: highlightedIndex === index ? '#73E2E0' : null,
                            }}
                            key={item.id}
                            {...getItemProps({
                                item,
                                index,
                            })}
                            className={"flex gap-4 items-center  py-4 px-2 rounded-lg bg-purple-dark my-0.5 hover:cursor-pointer"}


                        >
                            <Image src={item?.photo[0]?.image.publicUrlTransformed} width={80} height={80} className="object-cover w-16 h-16 rounded-xl" alt={item?.photo[0]?.altText} />
                            <div className="font-body text-center font-bold text-purple">{item.name}</div>

                        </li>
                    ))}
            </ul>
        </div>
    )
}




    // return <div className="w-auto bg-p/urple-dark p-4 flex justify-center ">


    //         <div {...getComboboxProps()}>
    //         <input  {...getInputProps({
    //             type: 'search',
    //             placeholder: 'Search for an item',
    //             id: 'search',
    //             className: loading ? 'loading' : 'w-full bg-yellow rounded-lg p-2 text-purple-dark font-body',
    //         })} />
    //         {/* <input type="text" className="w-full bg-yellow rounded-lg p-2 text-purple-dark font-body" /> */}

    //         <div {...getMenuProps()}>
    //             {isOpen && items.map((item, index) => <div key={item.id} {...getItemProps({ item })} highlighted={index == highlightedIndex}>
    //                 <img src={item?.photo?.image?.publicUrlTransformed} alt={item.name} width="50" />
    //                 {item.name}</div>)}
    //             {isOpen && !items.length && !loading && <div>Sorry, no items found for {inputValue}</div>}
    //         </div>
    //         <button className="rounded-lg absolute right-0 top-0 bg-purple-dark h-full flex w-10 justify-center items-center "><Image src="/search.svg" alt="search icon" width={15} height={15}></Image></button>
    //     </div >
    // </div >