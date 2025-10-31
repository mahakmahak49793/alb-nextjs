// app/astrologer/view-astrologer/components/chat-history.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Chat } from "@mui/icons-material";
import moment from "moment";
import { IndianRupee, secondsToHMS } from "@/utils/common-function";
import MainDatatable from "@/components/datatable/MainDatatable";
import { TableColumn } from "react-data-table-component";
import { base_url, get_chat_history_by_astrologer_id } from "@/lib/api-routes";


interface ChatHistoryData {
  _id: string;
  astrologerId: {
    _id: string;
    astrologerName: string;
  };
  customerId: {
    _id: string;
    customerName: string;
  };
  totalPrice: number;
  adminPrice: number;
  partnerPrice: number;
  duration: number;
  startTime: string;
  endTime: string;
  createdAt: string;
}

interface ChatHistoryProps {
  astrologerId: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ astrologerId }) => {
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState<ChatHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns: TableColumn<ChatHistoryData>[] = [
    { 
      name: 'S.No.', 
      cell: (row, rowIndex) => <div>{(rowIndex || 0) + 1}</div>,
      width: '80px' 
    },
    { 
      name: 'Astrologer', 
      selector: (row: ChatHistoryData) => row?.astrologerId?.astrologerName || 'N/A',
      sortable: true 
    },
    { 
      name: 'Customers', 
      selector: (row: ChatHistoryData) => row?.customerId?.customerName || 'N/A',
      sortable: true 
    },
    { 
      name: 'Total Price', 
      selector: (row: ChatHistoryData) => row?.totalPrice ? IndianRupee(row.totalPrice) : 'N/A' 
    },
    { 
      name: 'Admin Share', 
      selector: (row: ChatHistoryData) => row?.adminPrice ? IndianRupee(row.adminPrice) : 'N/A' 
    },
    { 
      name: 'Astrologer Share', 
      selector: (row: ChatHistoryData) => row?.partnerPrice ? IndianRupee(row.partnerPrice) : 'N/A' 
    },
    { 
      name: 'Duration', 
      selector: (row: ChatHistoryData) => row?.duration ? secondsToHMS(row.duration) : 'N/A' 
    },
    { 
      name: 'Start Time', 
      selector: (row: ChatHistoryData) => row?.startTime ? moment(Number(row.startTime)).format('hh:mm:ss a') : 'N/A' 
    },
    { 
      name: 'End Time', 
      selector: (row: ChatHistoryData) => row?.endTime ? moment(Number(row.endTime)).format('hh:mm:ss a') : 'N/A' 
    },
    { 
      name: 'Date', 
      selector: (row: ChatHistoryData) => row?.createdAt ? moment(row.createdAt).format('DD MMMM YYYY') : 'N/A', 
      width: "180px" 
    },
    {
      name: 'Message',
      cell: (row: ChatHistoryData) => (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Chat 
            sx={{ cursor: "pointer" }} 
            onClick={() => {
              const astroName = row?.astrologerId?.astrologerName?.split(' ')[0].toLowerCase() || 'astro';
              const customerName = row?.customerId?.customerName?.split(' ')[0].toLowerCase() || 'customer';
              router.push(`/history/chat-history/chat-summary/${astroName}-${customerName}?astroId=${row.astrologerId._id}&customerId=${row.customerId._id}`);
            }} 
          />
        </div>
      ),
      width: "120px"
    },
  ];

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!astrologerId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${base_url}${get_chat_history_by_astrologer_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            astrologerId: astrologerId,
            type: 'chat'
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setChatHistory(data.chatHistory || data.data || data);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [astrologerId]);

  return (
    <MainDatatable
      data={chatHistory} 
      columns={columns} 
      isLoading={isLoading}
    />
  );
};

export default ChatHistory;