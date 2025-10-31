// app/astrologer/view-astrologer/components/review.tsx
import React, { useEffect, useState } from "react";
import MainDatatable from "@/components/datatable/MainDatatable";
import { TableColumn } from "react-data-table-component";
import { base_url, get_review_by_astrologer_id } from "@/lib/api-routes";
import ViewModal from "./ViewModal";


interface ReviewData {
  _id: string;
  astrologer: {
    _id: string;
    astrologerName: string;
  };
  customer: {
    _id: string;
    customerName: string;
  };
  ratings: number;
  comments: string;
  is_verified: boolean;
}

interface ReviewProps {
  astrologerId: string;
}

const Review: React.FC<ReviewProps> = ({ astrologerId }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");

  const openModal = (comment: string) => {
    setSelectedComment(comment);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const columns: TableColumn<ReviewData>[] = [
    { 
      name: 'S.No.', 
      cell: (row, rowIndex) => <div>{(rowIndex || 0) + 1}</div>,
      width: '80px' 
    },
    { 
      name: 'Astrologer', 
      selector: (row: ReviewData) => row?.astrologer?.astrologerName || 'N/A',
      sortable: true 
    },
    { 
      name: 'Customer', 
      selector: (row: ReviewData) => row?.customer?.customerName || 'N/A',
      sortable: true 
    },
    { 
      name: 'Rating', 
      selector: (row: ReviewData) => row.ratings.toString(),
      sortable: true 
    },
    { 
      name: 'Comment', 
      cell: (row: ReviewData) => 
        row?.comments ? (
          <div 
            style={{ cursor: "pointer", color: '#1976d2' }} 
            onClick={() => openModal(row.comments)}
          >
            {row.comments.length > 50 ? `${row.comments.substring(0, 50)}...` : row.comments}
          </div>
        ) : 'N/A' 
    },
    { 
      name: "Status", 
      cell: (row: ReviewData) => (
        <div style={{ 
          color: row.is_verified ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {row.is_verified ? "Verified" : "Unverified"}
        </div>
      ) 
    },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      if (!astrologerId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${base_url}${get_review_by_astrologer_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            astrologerId: astrologerId
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || data.data || data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [astrologerId]);

  return (
    <>
      <MainDatatable 
        data={reviews} 
        columns={columns} 
        isLoading={isLoading}
      />

      <ViewModal
        open={modalIsOpen} 
        text={selectedComment} 
        title={'Rating Comment'} 
        onClose={closeModal} 
      />
    </>
  );
};

export default Review;