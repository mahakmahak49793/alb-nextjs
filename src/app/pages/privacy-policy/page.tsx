// pages/admin/privacy-policy.tsx
'use client'
import React, { useState, useEffect } from 'react';
import StaticPageEditor from '@/components/StaticPageEditor';
import { base_url } from '@/lib/api-routes';

const PrivacyPolicyPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getEndpoint = `${base_url}api/admin/get-privacy-policy`;
  const createEndpoint = `${base_url}api/admin/add-privacy-policy`;

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(getEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add auth token if needed
            // 'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        setContent(data?.privacyPolicy?.description || '');
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <StaticPageEditor
      title="Privacy Policy"
      initialContent={content}
      createEndpoint={createEndpoint}
      hasTypeSelector={false}
      loading={loading}
    />
  );
};

export default PrivacyPolicyPage;