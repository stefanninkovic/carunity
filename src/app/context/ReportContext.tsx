import { createContext, useContext, useState, ReactNode } from 'react';

export type ReportType = 'account' | 'offer' | 'wheel';

export interface Report {
  id: string;
  type: ReportType;
  targetId: string; // ID of the account/offer/wheel being reported
  targetName: string; // Name/title of what's being reported
  reason: string;
  description: string;
  reportedBy: string; // User ID of reporter
  reportedAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

interface ReportContextType {
  reports: Report[];
  submitReport: (
    type: ReportType,
    targetId: string,
    targetName: string,
    reason: string,
    description: string,
    reportedBy: string
  ) => void;
  getUserReports: (userId: string) => Report[];
  getReportReasons: (type: ReportType) => string[];
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const reportReasons = {
  account: [
    'Spam or fake account',
    'Harassment or bullying',
    'Impersonation',
    'Inappropriate content',
    'Scam or fraud',
    'Other'
  ],
  offer: [
    'Misleading information',
    'Duplicate listing',
    'Stolen vehicle',
    'Price manipulation',
    'Inappropriate content',
    'Scam or fraud',
    'Other'
  ],
  wheel: [
    'Inappropriate content',
    'Misleading information',
    'Spam',
    'Copyright violation',
    'Dangerous content',
    'Other'
  ]
};

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);

  const submitReport = (
    type: ReportType,
    targetId: string,
    targetName: string,
    reason: string,
    description: string,
    reportedBy: string
  ) => {
    const newReport: Report = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      targetId,
      targetName,
      reason,
      description,
      reportedBy,
      reportedAt: new Date(),
      status: 'pending'
    };

    setReports((prev) => [newReport, ...prev]);
  };

  const getUserReports = (userId: string) => {
    return reports.filter((report) => report.reportedBy === userId);
  };

  const getReportReasons = (type: ReportType) => {
    return reportReasons[type];
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        submitReport,
        getUserReports,
        getReportReasons
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
}
