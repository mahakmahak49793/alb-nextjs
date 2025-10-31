'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { TableColumn } from 'react-data-table-component';
import MainDatatable from '@/components/datatable/MainDatatable';
import DatatableHeading from '@/components/datatable/DatatableHeading';
import { base_url } from '@/lib/api-routes';
import { EditSvg, DeleteSvg } from '@/components/svgs/page';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface BlogCategory {
  _id: string;
  blog_category: string;
  createdAt: string;
}

interface CSVRow {
  [key: string]: string | number | boolean | undefined;
}

// ---------------------------------------------------------------------
// Utility: Deep Search
// ---------------------------------------------------------------------
const deepSearch = <T,>(data: T[], searchText: string): T[] => {
  if (!searchText) return data;
  const lowerSearch = searchText.toLowerCase();
  return data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(lowerSearch)
  );
};

// ---------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------
const CategoryPage: React.FC = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [filteredData, setFilteredData] = useState<BlogCategory[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${base_url}api/admin/blog-category-list`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data.categoryBlog || []);
      setFilteredData(data.categoryBlog || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await fetch(`${base_url}api/admin/delete_blog_category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId }),
      });
      if (!res.ok) throw new Error('Failed to delete category');

      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Edit: Store category in sessionStorage and navigate
  const handleEdit = (category: BlogCategory) => {
    sessionStorage.setItem('editBlogCategory', JSON.stringify(category));
    router.push('/astro-blog/category/add-category');
  };

  // Search filtering
  useEffect(() => {
    setFilteredData(deepSearch(categories, searchText));
  }, [searchText, categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // CSV Data
  const csvData: CSVRow[] = useMemo(() => {
    return filteredData.map((category, index) => ({
      'S.No.': index + 1,
      'Title': category.blog_category,
      'Created Date': moment(category.createdAt).format('DD MMM YYYY @ hh:mm a'),
    }));
  }, [filteredData]);

  // Datatable Columns
  const columns: TableColumn<BlogCategory>[] = useMemo(
    () => [
      {
        name: 'S.No.',
        selector: (_row, index) => (index !== undefined ? index + 1 : 0),
        width: '80px',
      },
      {
        name: 'Title',
        selector: (row) => row?.blog_category || '-',
      },
      {
        name: 'Created Date',
        selector: (row) => moment(row?.createdAt).format('DD MMM YYYY @ hh:mm a'),
      },
      {
        name: 'Action',
        cell: (row) => (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div
              onClick={() => handleEdit(row)}
              style={{ cursor: 'pointer' }}
            >
              <EditSvg />
            </div>
            <div
              onClick={() => handleDelete(row._id)}
              style={{ cursor: 'pointer' }}
            >
              <DeleteSvg />
            </div>
          </div>
        ),
        width: '180px',
      },
    ],
    [router]
  );

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        marginBottom: '20px',
        boxShadow: '0px 0px 5px lightgrey',
        borderRadius: '10px',
      }}
    >
      <DatatableHeading
        title="Blog Category"
        url="/astro-blog/category/add-category"
        data={csvData}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '20px',
          alignItems: 'center',
          marginBottom: '20px',
          backgroundColor: '#fff',
        }}
      >
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search your data..."
          style={{
            padding: '5px 10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '250px',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>

      <MainDatatable
        columns={columns}
        data={filteredData}
        isLoading={loading}
      />
    </div>
  );
};

export default CategoryPage;