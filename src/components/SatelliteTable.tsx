import { TableVirtuoso } from 'react-virtuoso';
import { Loader } from '@mantine/core';
import { JSX, useContext, useState } from 'react';
import { SatelliteContext } from './SatelliteContext';

export default function SatelliteTable(): JSX.Element {
  const satelliteContext = useContext(SatelliteContext);
  const loading = satelliteContext?.loading;

  let filteredData = satelliteContext?.data?.data ?? [];

  // Filtering logic
  if (satelliteContext?.name && satelliteContext?.noradCatId) {
    filteredData = filteredData.filter(
      (s) =>
        s.name.toLowerCase().includes(satelliteContext.name.toLowerCase()) &&
        s.noradCatId.toLowerCase().includes(satelliteContext.noradCatId.toLowerCase())
    );
  }

  if (
    satelliteContext?.name &&
    satelliteContext?.noradCatId &&
    satelliteContext?.objectTypes.length > 0
  ) {
    let a: typeof filteredData = [];
    satelliteContext.objectTypes.forEach((objectType) => {
      const matches = filteredData.filter(
        (s) =>
          s.name.toLowerCase().includes(satelliteContext.name.toLowerCase()) &&
          s.noradCatId.toLowerCase().includes(satelliteContext.noradCatId.toLowerCase()) &&
          s.objectType === objectType
      );
      a.push(...matches);
    });
    filteredData = a;
  }

  if (
    satelliteContext?.name === '' &&
    satelliteContext?.noradCatId === '' &&
    satelliteContext?.objectTypes.length > 0
  ) {
    let a: typeof filteredData = [];
    satelliteContext.objectTypes.forEach((objectType) => {
      const matches = filteredData.filter((s) => s.objectType === objectType);
      a.push(...matches);
    });
    filteredData = a;
  }

  if (
    satelliteContext?.name === '' &&
    satelliteContext?.noradCatId === '' &&
    satelliteContext?.orbitCodes.length > 0
  ) {
    let a: typeof filteredData = [];
    satelliteContext.orbitCodes.forEach((orbitCode) => {
      const matches = filteredData.filter((s) => s.orbitCode === orbitCode);
      a.push(...matches);
    });
    filteredData = a;
  }

  if (
    satelliteContext?.name &&
    satelliteContext?.noradCatId &&
    satelliteContext?.orbitCodes.length > 0
  ) {
    let a: typeof filteredData = [];
    satelliteContext.orbitCodes.forEach((orbitCode) => {
      const matches = filteredData.filter(
        (s) =>
          s.name.toLowerCase().includes(satelliteContext.name.toLowerCase()) &&
          s.noradCatId.toLowerCase().includes(satelliteContext.noradCatId.toLowerCase()) &&
          s.orbitCode.replace(/{|}/g, '') === orbitCode
      );
      a.push(...matches);
    });
    filteredData = a;
  }

  if (
    satelliteContext?.name === '' &&
    satelliteContext?.noradCatId === '' &&
    satelliteContext?.objectTypes.length > 0 &&
    satelliteContext?.orbitCodes.length > 0
  ) {
    let a: typeof filteredData = [];
    satelliteContext.objectTypes.forEach((objectType) => {
      const matches = filteredData.filter((s) => s.objectType === objectType);
      a.push(...matches);
    });
    a = a.filter((s) =>
      satelliteContext.orbitCodes.includes(s.orbitCode.replace(/{|}/g, ''))
    );
    filteredData = a;
  }

  if (
    satelliteContext?.name &&
    satelliteContext?.noradCatId &&
    satelliteContext?.objectTypes.length > 0 &&
    satelliteContext?.orbitCodes.length > 0
  ) {
    let a: typeof filteredData = [];
    satelliteContext.objectTypes.forEach((objectType) => {
      const matches = filteredData.filter(
        (s) =>
          s.name.toLowerCase().includes(satelliteContext.name.toLowerCase()) &&
          s.noradCatId.toLowerCase().includes(satelliteContext.noradCatId.toLowerCase()) &&
          s.objectType === objectType
      );
      a.push(...matches);
    });
    a = a.filter((s) =>
      satelliteContext.orbitCodes.includes(s.orbitCode.replace(/{|}/g, ''))
    );
    filteredData = a;
  }

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'noradCatId'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (field: 'name' | 'noradCatId') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'noradCatId') {
      const aNum = parseInt(a.noradCatId, 10);
      const bNum = parseInt(b.noradCatId, 10);
      return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
    } else {
      const aVal = a.name.toLowerCase();
      const bVal = b.name.toLowerCase();
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });

  if (loading) {
    return <Loader className="fixed inset-0 top-1/2 left-1/2 z-50" />;
  }

  if (!sortedData || sortedData.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#fff', padding: '2rem' }}>
        No Results Found
      </div>
    );
  }

  return (
    <TableVirtuoso
      style={{
        height: '400px',
        width: '900px',
        margin: 'auto',
        background: '#1a1a1a',
        paddingInline: '16px',
        color: '#fff',
        borderRadius:'32px'
      }}
      data={sortedData}
      fixedHeaderContent={() => (
        <tr className="mt-2">
          <th onClick={() => toggleSort('name')} className="w-44 cursor-pointer">
            Name ({sortField === 'name' ? sortDirection : 'asc'})
          </th>
          <th onClick={() => toggleSort('noradCatId')} className="w-32 cursor-pointer">
            NoradCatId ({sortField === 'noradCatId' ? sortDirection : 'asc'})
          </th>
          <th className="w-32">Orbit Code</th>
          <th className="w-32">Object Type</th>
          <th className="w-32">Country Code</th>
          <th className="w-32">Launch Date</th>
        </tr>
      )}
      itemContent={(index, satelliteInfo) => (
        <>
          <td>{satelliteInfo?.name}</td>
          <td>{satelliteInfo?.noradCatId}</td>
          <td>{satelliteInfo?.orbitCode.replace(/{|}/g, '')}</td>
          <td>{satelliteInfo?.objectType}</td>
          <td>{satelliteInfo?.countryCode}</td>
          <td>{satelliteInfo?.launchDate}</td>
        </>
      )}
    />
  );
}
