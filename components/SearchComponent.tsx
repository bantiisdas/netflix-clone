
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Movie } from '@/typing'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'


export default function Example() {
  const [selected, setSelected] = useState("")
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  
  const router = useRouter();

  const handleClick = () => {
    setShowSearchBar(!showSearchBar);
  }

  const fetchMovies = async () => {
    
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
    );
    const data = await response.json();
    
    setSearchResults(data.results)
  };

  useEffect(() => {
    fetchMovies();
  }, [query])

  
  const filteredItem =
     searchResults.filter((item) =>
          (item?.name || item?.title)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    // <div className='flex space-x-2 items-center justify-center'>
      <>
       <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-[80vw] sm:w-60">
          <div className="relative w-full h-8  cursor-default overflow-hidden rounded-lg bg-white bg-opacity-[0.15] text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              autoFocus
             autoComplete='off'
              className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 bg-transparent text-white font-light text-shadow-md focus:ring-0"
              // displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
              // value={query}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItem.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItem.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                    onClick={() => {router.push(`discover?${item.media_type}=${item.id}-${item.name || item.title}`)
                              setShowSearchBar(false)
                            }}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.name || item.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {/* {!showSearchBar ? <MagnifyingGlassIcon className="h-6 w-6 inline cursor-pointer" onClick={handleClick}/>
      : <XMarkIcon className="h-6 w-6 inline cursor-pointer" onClick={handleClick}/>} */}
      </>
    //{/* </div> */}
  )
}
