import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CreditCard,
  Car,
  Globe,
  GraduationCap,
  Briefcase,
  FileText,
  MapPin,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type { FoundIDRecord, LostIDRecord } from "../lib/storage";

type Props = {
  data: LostIDRecord | FoundIDRecord;
  type?: "lost" | "found";
  onClick?: () => void;
};

const idTypeIcons = {
  national_id: CreditCard,
  drivers_license: Car,
  passport: Globe,
  student_id: GraduationCap,
  work_id: Briefcase,
  other: FileText,
} as const;

const idTypeLabels: Record<string, string> = {
  national_id: "National ID",
  drivers_license: "Driver's License",
  passport: "Passport",
  student_id: "Student ID",
  work_id: "Work ID",
  other: "Other",
};

const statusColors: Record<string, string> = {
  searching: "bg-warning text-dark",
  matched: "bg-success",
  recovered: "bg-primary",
  unclaimed: "bg-secondary",
  returned: "bg-success",
};

export default function IDCard({ data, type = "lost", onClick }: Props) {
  const idType = (data as any).id_type as keyof typeof idTypeIcons;
  const Icon = idTypeIcons[idType] || FileText;
  const isLost = type === "lost";

  const title = isLost
    ? (data as LostIDRecord).owner_name
    : (data as FoundIDRecord).name_on_id;

  const location = isLost
    ? (data as LostIDRecord).last_seen_location
    : (data as FoundIDRecord).found_location;

  const status = (data as any).status as string;
  const photoUrl = (data as any).photo_url as string | undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card>
        <CardContent>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex gap-3 align-items-center">
              <div className="p-2 rounded bg-light">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="fw-semibold">{title}</div>
                <div className="text-muted small">{idTypeLabels[idType]}</div>
              </div>
            </div>

            <Badge className={statusColors[status] ?? "bg-secondary"}>
              {status}
            </Badge>
          </div>

          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2 text-muted small">
              <MapPin className="h-4 w-4" />
              <span className="text-truncate">{location || "-"}</span>
            </div>

            <div className="d-flex align-items-center gap-2 text-muted small">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date((data as any).created_date), "MMM d, yyyy")}
              </span>
            </div>
          </div>

          {photoUrl ? (
            <div className="mt-3">
              <img
                src={photoUrl}
                alt="ID Photo"
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}
