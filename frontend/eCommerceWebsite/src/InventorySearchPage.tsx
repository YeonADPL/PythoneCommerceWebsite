import React from 'react'
import { useSearchParams } from 'react-router-dom'

const InventorySearchPage = () => {

    const [searchParams] = useSearchParams();
  return (
    <div>
        <div>Testing Category {searchParams.get("category")}</div>
        <div>Testing Title {searchParams.get("title")}</div>
    </div>
  )
}

export default InventorySearchPage