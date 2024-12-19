// src/components/common/Table.js
import React from 'react';

const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      {/* Mobile View */}
      <div className="block md:hidden">
        {data.map((row, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-4 mb-4">
            {Object.keys(row).map((key) => (
              <div key={key} className="flex justify-between py-2 border-b">
                <span className="font-medium">{headers[key]}</span>
                <span>{row[key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <table className="hidden md:table min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {Object.values(headers).map((header, i) => (
              <th 
                key={i}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i}>
              {Object.keys(row).map((key, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};