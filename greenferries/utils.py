import os


def run_sh(command):
    res = os.system(command)
    if res != 0:
        print(f"Error while running `{command}`, aborting!")
        exit(1)


def clean_file(filepath):
    run_sh(f"touch {filepath} && rm {filepath}")
