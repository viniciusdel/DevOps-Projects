#!/bin/bash

# === Total CPU Usage ===
echo "======================"
echo "    CPU USAGE"
echo "======================"
# Use 'top' in batch mode for a single snapshot of CPU stats.
# The awk command extracts the line with CPU stats and prints it, using
# a more robust method to get percentages.
cpu_stats=$(top -bn1 | grep "Cpu(s)" | awk '{
    # Remove commas to ensure consistent parsing of numbers
    gsub(/,/, "", $0);
    for (i=1; i<=NF; i++) {
        if ($i ~ /us/) user_cpu = $(i-1);
        if ($i ~ /sy/) sys_cpu = $(i-1);
        if ($i ~ /id/) idle_cpu = $(i-1);
    }
    total_used_cpu=user_cpu + sys_cpu;
    printf "Used: %.2f%%\n", total_used_cpu;
    printf "Idle: %.2f%%\n", idle_cpu;
}')
echo "$cpu_stats"
echo ""

echo "+++++++++ TOP PROCESSES CPU +++++++++"
ps -eo pcpu,pid,user,comm --sort=-%cpu | head -n 6

echo ""
echo "--------- TOP PROCESSES MEM -----------"
ps -eo pmem,pid,user,comm --sort=-%mem | head -n6
