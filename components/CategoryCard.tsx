import React from 'react'
import cat from "@/public/images/cat.jpg"
import Image from 'next/image'
import Button from './Button'

const CategoryCard = () => {
    
    const categories = [
        {categoryName: "street wear", pageLink: "/streetWear", imageUrl: {cat}},
        {categoryName: "the sol strand", pageLink: "/theSolStrand", imageUrl: {}},
        {categoryName: "amari", pageLink: "/amari", imageUrl: {}},
        {categoryName: "the charm bar", pageLink: "/theCharmBar", imageUrl: {}},
        {categoryName: "the perfect find", pageLink: "/thePerfectFind", imageUrl: {}},
    ]

    // const handleClick = () => {

    // }
  return (
    <div>
{categories.map((category) => (
    <div key={category.categoryName} className='grid place-items-center'>
        <Image src={cat} alt="cat" className='object-cover col-start-1 row-start-1 h-[350px]' />
        <p className='col-start-1 row-start-1 uppercase text-white mt-[200px]'>{category.categoryName}</p>
        <Button name="shop now" styles="col-start-1 row-start-1 mt-[280px]"/>
    </div>
))}
        
    </div>
  )
}

export default CategoryCard